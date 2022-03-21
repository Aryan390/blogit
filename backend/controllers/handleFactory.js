const catchAsync = require('../utils/catchAsync');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const doc = await Model.create(req.body);

    if (!doc) return res.status(400).json({ message: 'Not created' });

    res.status(201).json({ message: 'Resource created', doc });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // this filter object is created to handle nested routes during getting comment pertaining to a particular post
    let filter = {};

    if (req.params.postId) filter = { post: req.params.postId };

    const doc = await Model.find(filter);

    res.status(200).json(doc);
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    // const doc = await Model.findById(req.user._id);

    if (!doc) return res.status(404).json({ message: 'Not found' });

    res.status(200).json(doc);
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return res.status(404).json({ message: 'Not found' });

    res.status(200).json(doc);
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return res.status(404).json({ message: 'Not found' });

    res.status(200).json({ message: 'Deleted' });
  });
