const CRUD = (model) => {
  const create = async (obj) => {
    if (!obj) throw new Error('Missing Client');
    return model.create(obj);
  };

  const get = async (obj) => model.findById(obj);

  const update = async (clientId, data) => model.updateOne(
    { _id: clientId },
    data,
  );

  const getAll = async () => model.find();

  const del = async (id) => model.deleteOne({ _id: id });

  return {
    create,
    get,
    getAll,
    update,
    del,
  };
};

module.exports = CRUD;
