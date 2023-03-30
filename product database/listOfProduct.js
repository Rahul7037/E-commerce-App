const mongoose = require('mongoose');
const Product = require('./product')

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/productList');
  console.log("server started")
}


  const product = [
    {   name : 'realme Buds 2 Wired Headset  (Black, In the Ear)',
        price : 599,
        category : 'electornics',
        description : "Hear every soundtrack even more clearly when you use these Realme Buds 2 earphones. They come with the powerful 11.2-mm bass boost driver for elevated bass response. Moreover, these stylishly designed earphones have integrated magnets which offer a hassle-free way of storing them. Also, the tangle-free cables and a cable organizer make it convenient to carry along wherever you go.",
        rating : 4.3
        },
        {   name : 'Mi 4A PRO 80 cm (32 inch) HD Ready LED Smart Android TV',
        price : 15999,
        category : 'electornics',
        description : "There is no fun in watching your favourite movie or show on a TV where the display quality is poor. Now, boost the fun and watch them all in good and clear-quality on this 80 cm (32) Mi smart TV. Its HD Ready display can accentuate your viewing experience and make it better. You can even access video streaming apps on it and never run out of quality-content to watch and enjoy. It comes with 2 speakers that deliver powerful audio which lets you experience the environment of a cinema hall right in your bedroom or living room.",
        rating : 4.4
        },
        {   name : 'SAMSUNG Galaxy M33 5G (Emarld Brown, 128 GB)  (6 GB RAM)',
        price : 16554,
        category : 'electornics',
        description : "Samsung Galaxy M33 5G (Emerald Brown, 6GB, 128GB Storage) | Travel Adapter to be Purchased Separately | 5nm Processor | 6000mAh Battery | Voice Focus | Upto 12GB RAM with RAM Plus",
        rating : 4.1
        },
        {   name : 'SAMSUNG 253 L Frost Free Double Door 3 Star Refrigerator  (Elegant Inox, RT28A3453S8/HL)',
        price : 24490,
        category : 'electornics',
        description : "You can keep your perishables fresh and ready for consumption inside the Samsung 253 L refrigerator (RT28A3021S8/HL) which provides efficient cooling while saving energy and keeping the operational noise level to a minimum. This refrigerator will continue to cool your food items even when there’s a power cut with the help of its Smart Connect Inverter. Lastly, say goodbye to foul smells with the inbuilt deodorizer, which gets rid of nasty smells by continuously circulating the air through activated carbon filters.",
        rating : 4.4
        },
        {   name : 'PEPS Springkoil Normal Top Blue 6 inch Double Bonnell Spring Mattress  (L x W: 75 inch x 48 inch)',
        price : 13071,
        category : 'furniture',
        description : "Upgrade to fresh, new mornings with a world class spring mattress that is as easy on your wallet as it is on your back. The rigid, yet flexible core offers the right support for your back without losing shape even on prolonged usage. Comes with the added comfort of a pillow top and super soft, ruffled fabric.",
        rating : 4.2
        },
        {   name : 'Ebee Engineered Wood Corner Table  (Finish Color - Brown, DIY(Do-It-Yourself))',
        price : 1349,
        category : 'furniture',
        description : "Adorn and add style to your living room with this corner stand from Ebee. You can use this stand to place decorative items, newspapers, and magazines.",
        rating : 4.2
        },
        {   name : 'FURNY Alaina Fabric 3 Seater Sofa  (Finish Color - Brown, Pre-assembled)',
        price : 16825,
        category : 'furniture',
        description : "Furny supplies to most leading retailers and brands in India, and brands charge significantly higher price than what we can offer at wholesale rates after GST, it makes sense to purchase directly from a leading manufacturer and get the same quality assurance at less than a fraction of the brands selling price. A very generously made sofa from all the best materials yields a perfect modular sofa for your living room. Furny sofa collection is spaciously designed with larger depth to allow for broader seating and allowing complete relaxation until the thigh to provide with superb comfort. A generously proportioned sofa that fits around you - with individual modular units to make delivery hassle free and protecting your sofa against any untoward damages occurring due to narrow corridors. sofa made of high density foam, deep fiber cushioning and made of finest material that last long.",
        rating : 3.5
        },
        {   name : 'Crystal Furnitech Sigma Engineered Wood Coffee Table  (Finish Color - wallnut + wenge, Knock Down)',
        price : 3928,
        category : 'furniture',
        description : "No description available from seller",
        rating : 4.4
        },
        {   name : 'Vaseline Non Greasy Intensive Care Deep Moisture Body Lotion  (400 ml)',
        price : 260,
        category : 'homeEssentials',
        description : "Pamper your dry skin with the Vaseline Intensive Care body lotion to get healthier and healed skin.Moisturized Skin,Enriched with micro-droplets of Vaseline jelly and glycerin, this lotion moisturises your skin and leaves it feeling fresh and hydrated all day long.",
        rating : 4.5
        },
        {   name : 'Colgate ZigZag Antibacterial Soft Toothbrush  (6 Toothbrushes)',
        price : 72,
        category : 'homeEssentials',
        description : "Get Superior Germ protection with Colgate ZigZag Anti-bacterial toothbrush. Ideal for adults (Men & Women). This manual toothbrush comes with 100% Anti-bacterial bristles, powered with Silver ion technology, that inhibit the growth of bacteria on the bristle surfaceInside the mouth.",
        rating : 4.1
        },
        {   name : 'LIFEBUOY Total 10  (Combo Pack 2 + 1 Free, 150 g each)  (2 x 150 g)',
        price : 102,
        category : 'homeEssentials',
        description : "soup for man and woman",
        rating : 4
        },
        {   name : 'HIMALAYA Purifying Neem Face Wash  (200 ml)',
        price : 133,
        category : 'homeEssentials',
        description : "Purifying Neem Face Wash",
        rating : 4.4
        },
        {   name : 'JOHNSONS All Day Long Baby Lotion  (500 ml)',
        price : 326,
        category : 'babyCare',
        description : "Johnson's baby lotion for new born, with 24 hour moisture, prevents moisture loss and protects baby's skin barrier. Baby soft skin, all day long Non greasy formula for quick absorption. Clinically mildness proven. Made with natural plant oil. Recommended by doctors. Ph balanced and hypoallergenic. No added parabens, sulfates or dyes.",
        rating : 4.5
        },
        {   name : 'Miss & Chief by Flipkart Polycotton Baby Bed Sized Bedding Set  (Pink)',
        price : 316,
        category : 'babyCare',
        description : "Mosquito And Insect Protection Net With Bedding",
        rating : 4.2
        },
        {   name : 'BeyBee Cotton Baby Bed Sized Bedding Set  (Sea Green)',
        price : 148,
        category : 'babyCare',
        description : "This Dry Sheet are made of 100 percent waterproof organic material and highly absorbent. Freedom to enjoy uninterrupted sleep for longer periods. Dries faster, diaper free night and rush-free skin, cozy, smooth and silky feeling",
        rating : 4.0
        },
        {   name : 'Cuddles - Super Pants Pant Style Diaper - L  (62 Pieces)',
        price : 549,
        category : 'babyCare',
        description : "Key Features Quick Max Absorption technology to provide quick absorption and lonf lasting dryness. The Diaper pants that provide Super Comfort, Super Dryness and Super Protection to the baby. Zig-Zag Channels Middle Layer",
        rating : 4.2
        },
  ]
  Product.insertMany(product,function(error, docs) {
    console.log(docs)
  })
