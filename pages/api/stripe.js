import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const countries = ['AR', 'AU', 'AT', 'BE', 'BO', 'BR', 'BG', 'CA', 'CL', 'CO', 'CR', 'HR', 'CY', 'CZ', 'DK', 'DO', 'EE', 'FI', 'FR', 'DE', 'GR', 'HK', 'HU', 'IS', 'IN', 'ID', 'IE', 'IL', 'IT', 'JP', 'LV', 'LI', 'LT', 'LU', 'MT', 'MX', 'NL', 'NZ', 'NO', 'PY', 'PE', 'PL', 'PT', 'RO', 'SG', 'SK', 'SI', 'ES', 'SE', 'CH', 'TH', 'TT', 'AE', 'GB', 'US', 'UY']

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: countries, // Allow shipping to all countries // Collect address fields
        },
        shipping_options: [
          { shipping_rate: 'shr_1N8OnXK37WeTylvft4SaFtjJ' },
          { shipping_rate: 'shr_1N8OD7K37WeTylvfM0NwziUW' },
        ],
        line_items: req.body.map((item) => {
          const image = item.image[0].asset._ref;
          console.log(item.image[0]);
          const newImage = image.replace('image-', 'https://cdn.sanity.io/images/lxiuk0a4/production/').replace('-png', '.png');

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${item.name} - ${item.size}`,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
