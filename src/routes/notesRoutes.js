import express, { Router } from "express"
import Note from "../models/noteMODEL.js"
const router = express.Router()

//obtener todas las notas
router.get ("/", async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        console.error("Erro al obtener las Notas" , error)
        res.status(500).json({ error: "Internal server error"})
    }
})
//obtener una nota por ID
router.get("/:id", async (req,res) =>{
    try {
        const id = req.params.id
        const note = await Note.findById(id)
        if(!note) return res.status(404).json({ error: "Nota no encontrada"})

        res.status(200).json(note)
    } catch (error) {
        console.error("Error al obtener una nota por ID" , error)
        res.status(500).json({ error: "Internal server error" })
    }
})
//crear una nueva nota
router.post("/", async (req,res) =>{
    try {
        const { title, description } = req.body
        const note = new Note({ title, description})
        const savedNote = await note.save()
        if(savedNote){
            res.status(201).json({mesagge: "Note creada correctamente", note: savedNote})
        }
        
        
    } catch (error) {
        console.error("Error al crear una nota", error)
        res.status(500).json({error: "Internal server error"})
    }
})

//eliminar una nota

router.delete("/:id", async (req,res) =>{
    try {
        const id = req.params.id
        const deleteNote = await Note.findByIdAndDelete(id)
        if (!deleteNote) return res.status(404).json({ error: "Note no eliminada" })
        res.status(200).json({ message: "Nota eliminada correctamente" })
    } catch (error) {
        console.error("Error al eliminar una nota" , error)
        res.status(500).json({ error: "Internal server error" })
    }
})

//editar una nota

router.put("/:id", async (req,res) =>{
    try {
        const id = req.params.id
        const { title, description } = req.body
        const updateNote = await Note.findByIdAndUpdate(id, { title, description}, { new: true})
        if (!updateNote) return res.status(404).json({ error: "Note no actualizada correctamente" })
        res.status(200).json({ message: "Note actualizada correctamente", note: updateNote})
    } catch (error) {
        console.error("Error al editar una Note" , error)
        res.status(500).json({ error: "Internal server error"})
    }
})
export default router