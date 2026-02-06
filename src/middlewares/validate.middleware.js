export default function validate(schema) {
  return (req, res, next) => {
    try {
      const data = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      req.validated = data;
      next();
    } catch (err) {
      err.status = 400;
      next(err);
    }
  };
}
