import pgPromise from 'pg-promise';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'

const app = express()
const pgp = pgPromise({

});
const db = pgp('postgres://postgres:fff@localhost:5432/butcher_shop_db')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
//prices are per kg
/*
const  meats = [
    {id: 1, type: 'Wagyu', price: 20, image: './images/Wagyu.webp'},
    {id: 2, type: 'Lamb Cutlet', price: 10, image: './images/Lamb_Cutlet.jpeg'},
    {id: 3, type: 'Beef Loin', price: 15, image: './images/Beef_Loin.jpeg'},
]
const beef = [
  {id: 1, type: 'Wagyu', price: 20, image: './images/Wagyu.webp'},
  {id: 3, type: 'Beef Loin', price: 15, image: './images/Beef_Loin.jpeg'},
]
const lamb = [
  {id: 2, type: 'Lamb Cutlet', price: 10, image: './images/Lamb_Cutlet.jpeg'},
]

app.get('/api/meats', (req,res)=> {
    res.json(meats);
})
app.get('/api/beef', (req,res)=> {
  res.json(beef);
})
app.get('/api/lamb', (req,res)=> {
  res.json(lamb);
})
*/
app.get('/orders', async (req, res) => {
  res.json(req.params)
})
app.get('/meats', async (req, res) => {
  try {
    const meats = await db.any('SELECT * FROM public."Item" ORDER BY id ASC ');
    res.json(meats);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

/*app.post('/meats', async (req, res) => {
  db.tx(async (t) => {
    const query = async () => {
      const promises = meatFile.map(item => {
        t.none('INSERT INTO public."Item" (price, name, description, unit, image, display, amount) VALUES ($1, $2, $3, $4, $5, $6, $7)', [item.price, item.name, item.description, item.unit, item.image.url, true, 100])
      })
      return await t.batch(promises);
    }

    await query();

    return;

  }).then((req) => {
    console.log("success");
  }). catch((err) => {
    console.error(err);
  })

})*/


app.post('/orders', async (req, res) => {
  const { paid, discount, pickup, items, address, customer, status } = req.body

  db.tx(async (t) => {
    //TODO find to what control users can manipulate their order after they submit it. can they cancel it and if so what is the deadline
    //TODO see if wechat can identify users through login id or some other method, this will stop multiple instances of the same customer in the database
    //TODO hardcode a table of meats in databse to be accessed by the miniprogram

    const customerQuery = t.oneOrNone('SELECT id FROM public."Customer" WHERE openid = $1', [customer.open_id])
      .then(existingCustomer => {
        if (existingCustomer) {
          return existingCustomer; // Return the existing customer ID
        } else {
          // Insert a new customer and return the generated ID
          return t.one('INSERT INTO public."Customer" (first_name, last_name, openid) VALUES ($1, $2, $3) RETURNING id', [customer.first_name, customer.last_name, customer.open_id]);
        }
      });

    const addressQuery = t.one('INSERT INTO public."Address" (address_line1, address_line2, suburb, postcode) VALUES ($1, $2, $3, $4) RETURNING id', [address.streetLine1, address.streetLine2, address.suburb, address.postcode]);

    const orderQuery = async (addressResult, customerResult) => {
      const generatedId1 = addressResult.id;
      const generatedId2 = customerResult.id;

      const time = new Date();

      return await t.one('INSERT INTO public."Order" (create_date, update_date, paid, discount, pickup, address_id, customer_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [time, time, paid, discount, pickup, generatedId1, generatedId2, status]);
    };

    const orderItemsQuery = async (result3) => {
      const generatedId3 = result3.id;
      const promises = items.map(item =>
        t.none('INSERT INTO public."OrderItem" (order_id, amount, discount, item_id) VALUES ($1, $2, $3, $4)', [generatedId3, item.kg, item.discount, item.id])
      );

      return await t.batch(promises);
    }

    const [addressId, customerId] = await t.batch([customerQuery, addressQuery])

    const orderId = await orderQuery(addressId, customerId);

    await orderItemsQuery(orderId);

    return orderId;
  })
    .then((req) => {
      res.json({ id: req.id });
    })
    .catch(error => {
      console.error('Error inserting data:', error);
      res.status(500).send('An error occurred during data insertion');
    });
})
//do something similar in order-service
app.get('/api/meats', async (req, res) => {
  await newFunction(db, res);
})
app.put('/meats', async(req, res) => {
  const {items} = req.body;
  db.tx(async (t) => {
    const updateItemsAmountQuery = async() => {
      
      const promises = items.map(item => {
        t.none('UPDATE public."Item" SET amount = amount - $1 where id = $2', [item.kg, item.id])

      })
      return await t.batch(promises)
    }
    await updateItemsAmountQuery()
    return
  })
  .then((req) => {
    console.log("success")
  })
  .catch(err => {
    console.error(err)
  })
})
//TODO make order page, currently it shows one order in a list through id, and will show the items once clicked
app.get('/user/:id/orders', async (req, res) => {
  const identity = req.params.id

  const data = await db.many(`select "Order".id, paid, discount, pickup, 
  openid, status from "Order" left join "Customer" on "Order".customer_id = 
  "Customer".id where "Customer".openid = $1`, [identity])
    .then((result) => {
      res.json(result)
    }).catch(error => {
      console.error('Error getting data:', error);
      res.status(404).send('An error occurred during data get');
    });
})

app.put('/user/:id/orders/:orderId', async (req, res) => {
  const userId = req.params.id;
  const orderId = req.params.orderId;
  const newStatus = "deleted"; 

  try {
    const result = await db.tx(async (t) => {
      // Fetch the status and order details
      const orderData = await t.one(
        'SELECT "Order".status FROM "Order" ' +
        'INNER JOIN "Customer" ON "Order".customer_id = "Customer".id ' +
        'WHERE "Customer".openid = $1 AND "Order".id = $2',
        [userId, orderId]
      );

      // Update the order status
      await t.none('UPDATE "Order" SET status = $1 WHERE id = $2', [newStatus, orderId]);

      return orderData.status;
    });

    // Respond with the updated status
    res.json({ status: result });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'An error occurred while updating status.' });
  }
});


app.get('/order/:id/orderItems', async (req, res) => {
  const identity = req.params.id

  const data = await db.many(`
  SELECT "OrderItem".item_id, "OrderItem".amount, "Item"."name", "Item".price, "Item".unit
  FROM "OrderItem"
  JOIN "Item" ON "OrderItem".item_id = "Item".id
  WHERE "OrderItem".order_id = $1`, [identity])
    .then((result) => {
      res.json(result)
    }).catch(error => {
      console.error('Error getting data:', error);
      res.status(404).send('An error occurred during data get');
    });
})

app.post('/login', async (req, res) => {
  const { code } = req.body;

  // Call WeChat's code2Session API to exchange the code for session information
  const response = await wxCode2Session(code);

  // Extract the session information, including the OpenID
  const { openid, session_key } = response;

  // Store the session information in your database or perform other operations
  // ...

  res.json({ openid });
});

// Function to make a request to WeChat's code2Session API
async function wxCode2Session(code) {
  const url = 'https://api.weixin.qq.com/sns/jscode2session';
  const appId = 'wxcdabb6fd12bd8e8a';
  //TODO cover secret key (sha256 encryption?)
  const secret = 'fc02a864fbe0e11f8886e80d249b97cf';

  const params = {
    appid: appId,
    secret: secret,
    js_code: code,
    grant_type: 'authorization_code'
  };

  const response = await fetch(`${url}?${new URLSearchParams(params)}`);
  const data = await response.json();

  return data;
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function newFunction(db, res) {
  const meats = await db.any('SELECT * From public."Item"');
  console.log("meats: " + JSON.stringify(meats));
  res.json(meats);
}

