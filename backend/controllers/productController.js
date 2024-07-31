import { PrismaClient } from "@prisma/client";
import deleteSize from "../helpers/eliminarSize.js";
import { io } from "../index.js";

const prisma = new PrismaClient()

const findAll = async(req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                detProductSize: {
                    include: {
                        size: true
                    }
                },
                detProductColor: {
                    include: {
                        color: true
                    }
                },
                type: true
            }
        })

        return res.status(200).json({msg: 'Ok', products})
    } catch (error) {
        console.log(error)
    }

    return res.status(400).json({msg: "Si funciona"});
}

const create = async(req, res) => {
    try {
        const product = await req.body.product

        await prisma.product.create({
            data: {
                name: product.name,
                price: +product.price,
                amount: +product.amount,
                typeID: +product.typeID,
                description: product.description,
                imageUrl: product.imageUrl
            }
        })

        product.detProductSize.map(async(size) => {
            await prisma.detProductSize.create({
                data: {
                    productID: +res.ID, 
                    sizeID: +size.ID
                }
            })
        })

        io.emit('productsUpdate')

        return res.status(200).json({msg: 'Ok', res});
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {
    const product = await req.body.product

    try {
        product.detProductSize.map(async(size) => {
            const existSize = await prisma.detProductSize.findFirst({
                where: {
                    productID: +product.ID, 
                    sizeID : +size.ID
                }
            })

            if(existSize) {
                return
            }

            await prisma.detProductSize.create({
                data: {
                    productID: +product.ID, 
                    sizeID: +size.ID
                }
            })

        })

        await prisma.product.update({
            where: {
                ID: product.ID
            },
            data: {
                name: product.name,
                price: +product.price,
                amount: +product.amount,
                typeID: +product.typeID,
                description: product.description,
                imageUrl: product.imageUrl
            }
        })

        io.emit('productsUpdate')

        return res.status(200).json({msg: 'Producto Actualizado Correctamente'});
    } catch (error) {
        console.log(error)
    }
}

const deleteOne = async(req, res) => {
    const {id} = await req.params

    try {
        await prisma.product.update({
            where: {
                ID: +id
            }, 
            data: {
                active: false
            }
        })

        io.emit('productsUpdate')

        res.status(200).json({msg: 'Producto Eliminado Correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const recoveryOne = async(req, res) => {
    const {id} = await req.params

    try {
        await prisma.product.update({
            where: {
                ID: +id
            }, 
            data: {
                active: true
            }
        })

        io.emit('productsUpdate')

        res.status(200).json({msg: 'Producto Reactivado Correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const deleteProductSize = async(req, res) => {
    const { productID, sizeID } = req.params

    try {
        const size = await prisma.detProductSize.findFirst({
            where: {
                sizeID: +sizeID, 
                productID: +productID
            }
        })

        await prisma.detProductSize.delete({
            where : {
                ID : size.ID
            }
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msg: "Hubo un error, por favor, intente mas tarde"
        })
    }

    io.emit('productsUpdate')

    return res.status(200).json({ msg: "Talla Eliminada Correctamente" })
}

export {
    findAll,
    create, 
    update,
    deleteOne, 
    recoveryOne, 
    deleteProductSize
}