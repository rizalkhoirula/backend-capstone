var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { event } = require("../models/");

const v = new Validator();


// API GET EVENT REQUEST
router.get('/', async (req, res) => {
    const events = await Event();
    return res.json(events);
});

// API GET BY ID REQUEST
router.get('/:id', async (req, res) => {
    const id =  req.params.id;
    Event = await event.findByPk(id);
    return res.json(Event);
});

// API POST EVENT REQUEST
router.post('/', async (req, res) => {
const scheme =  {
    nama: 'string',
    kota: 'string',
    description: 'string'
}
  const validate = v.validate(req.body, scheme);

  if (validate.length) {
    return res
    .status(400)
    .json(validate);
  }

const Event = await event.create(req.body); 
// return res.json(Event);
res.json({message: 'Add Event Succesfully'});
});


// API UPDATE EVENT REQUEST
router.put('/:id', async (req, res) => {
    const id =  req.params.id;

    let Event = await event.findByPk(id);

    if (!Event) {
        return res.json({message: 'Event Not Found'});
    }
    const scheme =  {
        nama: 'string|optional',
        kota: 'string|optional',
        description: 'string|optional'
    }
      const validate = v.validate(req.body, scheme);
    
      if (validate.length) {
        return res
        .status(400)
        .json(validate);
      }
      Event = await event.update(req.body, { where: { id: id } });
      res.json({message : 'Event updated successfully'});
    // res.json({message:'Product Ditemukan'});
});

// API DELETE EVENT REQUEST
router.delete('/:id', async(req, res) => {
    const id =  req.params.id;

    const Event = await event.findByPk(id);

    if (!Event) {
        return res.json({message: 'Event Not Found'});
    }
    await Event.destroy();
    res.json({message: 'Event Deleted successfully'});
});
     

module.exports = router;