import express, { Request, Response } from 'express';
import { CourseRequest, CourseResponse } from '@sis/dto';
import { isValidObjectId } from 'mongoose';
import { CourseDB } from '../data/mongoose';

type Course = {
  id: string,
  name: string,
  totalUnits: number,
  description: string
};

const router = express.Router();

// read all
router.get('/', async (req: Request, res: Response) => {
  const course = await CourseDB.find({});
  const response: Course[] = [];
  course.forEach(element => {
    response.push({ id: element.id, name: element.name, totalUnits: element.totalUnits, description: element.description });
  });
  res.send(response);

});

// read specific by id
router.get('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send('invalid id');
  const course = await CourseDB.findById(req.params.id);
  if (!course) {
    return res.status(404).send();
  }
  const response: Course = { id: course.id, name: course.name, totalUnits: course.totalUnits, description: course.description };
  res.send(response);
});

// create
router.post('/', async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('body is empty');
  }
  if (req.body?.name?.length <= 0) {
    return res.status(400).send('name is required');
  }
  const course = new CourseDB({
    name: req.body.name,
    totalUnits: req.body.totalUnits,
    description: req.body.description,
    created: new Date()
  });
  await course.save();

  res.status(200).send('' + course.id);
});


router.post('/course', async (req: Request<undefined, CourseResponse, CourseRequest>, res) => {
  const courses = await CourseDB.find({id: req.body.id, name: req.body.name, totalUnits: req.body.totalUnits, description: req.body.description,});
  if (courses.length === 0) {
    return res.status(404).send();
  }
  const course = courses[0]
  return res.status(200).send({id: course.id, name: course.name, totalUnits: course.totalUnits, description: course.description,});
});


// update specific by id
router.put('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send('invalid id');
  const course = await CourseDB.findById(req.params.id);
  if (!course) {
    return res.status(404).send();
  }
  if (req.body?.name?.length <= 0) {
    return res.status(400).send('name is required');
  }
  if (req.body?.totalUnits?.length <= 0) {
    return res.status(400).send('totalUnits is required');
  }
  if (req.body?.description?.length <= 0) {
    return res.status(400).send('description is required');
  }
  course.name = req.body.name;
  course.totalUnits = req.body.totalUnits;
  course.description = req.body.description;
  await course.save();
  res.send();
});


// delete specific by id
router.delete('/:id', async (req, res) => {

  if (!isValidObjectId(req.params.id))
    return res.status(400).send('invalid id');
  const course = await CourseDB.findById(req.params.id);
  if (!course) {
    return res.status(404).send();
  }
  await course.deleteOne();
  res.send();

});

export default router; 