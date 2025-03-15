export const getUser = async (req, res) => {
  res.json(req.user);
};
