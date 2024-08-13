import { emailContactForm } from "../helpers/email.js"

export const contactUs = async(req, res) => {
    const { name, lastName, email, message } = req.body

    try {
        await emailContactForm(name + ' ' + lastName, email, message)

        return res.status(201).json({
            msg: 'Mensaje enviado correctamente'
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msg: 'Hubo un error al enviar el mensaje, por favor, intente más tarde'
        })
    }
}

