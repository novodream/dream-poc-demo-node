import express from "express";
import mongoose from "mongoose";

const Movie = mongoose.model('Movie', {
    title: String,
    year: Number
})

const router = express.Router()

router.get('/', async (req, res) => {
    const movies = await Movie.find({})
    res.send(movies)
})

router.post('/', async (req, res) => {
    const {title, year} = req.body
    const movie = new Movie({title, year})
    await movie.save()
    res.send(movie.id)
})

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    res.send(movie)
})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    res.send(movie)
})

export const moviesRouter = router
