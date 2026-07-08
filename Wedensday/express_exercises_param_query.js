//Exercise_1:

let products = [

    { id: 1, name: 'Laptop', price: 3000, category: 'tech' },

    { id: 2, name: 'Mouse', price: 150, category: 'tech' },

    { id: 3, name: 'Desk', price: 800, category: 'furniture' },

    { id: 4, name: 'Monitor', price: 1200, category: 'tech' },

];


import express from "express";

const app = express()

app.get("/products/:id", (req, res) => {
    const { id } = req.params;



    if (!id || isNaN(+id)) {
        res.statusCode = 400;
        return res.end("invalid path");
    }


    const product = products.find((product) => product.id === +id)

    if (!product) {
        res.status(404).json({ "error": "Not found" })
    }

    return res.json(product)

});





//Exercise_2:

app.get("/products", (req, res) => {
    console.log(req.query);

    

    const { category } = req.query;
    const { minPrice } = req.query;
    const { maxPrice } = req.query;
    const {sort} = req.query;

    if (category) {
        console.log("category")
        const productsInCategory = products.filter((product) => product.category === category);
        if (productsInCategory.length === 0) return res.status(404).json({ err: "Not found" });
        res.json(productsInCategory);
    }

    if (minPrice && maxPrice) {
        console.log("price")
        const productsInRange = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
        if (productsInRange.length === 0) return res.status(404).json({ err: "Not found" });
        if (sort){
        const sortedProducts = productsInRange.sort((a, b) => a.price - b.price)
        console.log(sortedProducts)
        res.json(sortedProducts);
        }
         res.json(productsInRange);


    }else{

    console.log("there is not a query");
    console.log(products);
    res.json(products);
    }
});




//Exercise_3:

app.delete("/products/:id", (req, res) => {
    console.log("delete")
    const {id} = req.params
    console.log(Object.keys(req.query).length === 0 || isNaN(+id) || !id)

    if (Object.keys(req.query).length === 0 || isNaN(+id) || !id){
        console.log("Invalid path!")
        return res.status(400).json({err: "Invalid path!"})
    };

    const dletedProduct = products.filter((product) => {return product.id === +id})
    if (!dletedProduct)return res.status(404).json({err: "Not found"})

    const newProducts = products.filter((product) => {return product.id !== +id})
    products = newProducts
    res.status(204).end()


});



console.log(products)






const PORT = process.env.PORT

app.listen(PORT, () => { console.log(`Server is running...`) })