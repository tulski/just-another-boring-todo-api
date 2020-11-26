const getMany = (model) => async (req, res) => {
  try {
    const docs = await model
      .find({ ...req.body, createdBy: req.user._id })
      .lean()
      .exec()
    return res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

const createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create({
      ...req.body,
      createdBy: req.user._id,
    })
    return res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

const getOne = (model) => async (req, res) => {
  try {
    const doc = await model.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    })
    return res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

const updateOne = (model) => async (req, res) => {
  try {
    const doc = await model.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id,
      },
      req.body,
      { new: true }
    )
    return res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

const deleteOne = (model) => async (req, res) => {
  try {
    const doc = await model.findOneAndRemove({
      _id: req.params.id,
      createdBy: req.user._id,
    })
    return res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const controllers = (model) => ({
  getMany: getMany(model),
  createOne: createOne(model),
  getOne: getOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
})
