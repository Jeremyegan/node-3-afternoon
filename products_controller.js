
module.exports = {
    create: (req, res) => {
        const { name, description, price, image_url } = req.body;
        req.app.get('db').create_product(name, description, price, image_url)
        .then(() => {
            res.status(200).send('Product created') 
        })
        .catch(err => {
            res.status(500).send("Could not create.");
            console.log(err)
        });
    },

    getOne: (req, res) => {
        const { id } = req.params
        req.app.get('db').read_product( id )
        .then((product) => res.status(200).send(product))
        .catch(err => {
            res.status(500).send("Couldn't complete request to find product")
            console.log(err)
        })


    },

    getAll: (req, res) => {
        req.app.get('db').read_products()
        .then((products) =>  res.status(200).send(products))
        .catch(err => {
            res.status(500).send("Couldn't complete request for all products")
            console.log(err)
        })
    },

    update: (req, res) => {
        const { id } = req.params
        const { desc } = req.query
        const db = req.app

        db.update_product([id, desc])
        .get('db')
        .then(() => res.status(200) )
        .catch(err => {
            res.status(500).send("Could not update.");
            console.log(err)
        });
    },

    delete: (req, res) => {
        const { id } = req.params
        const db = req.app
        .get('db')

        db.delete_product( id )
        .then(() => res.sendStatus(200) )
        .catch(err => {
            res.status(500).send("Could not delete.");
            console.log(err)
        });
    }
}