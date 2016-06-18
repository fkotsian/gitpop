import express from 'express';
import path from 'path';
const app = express();

app.set('port', process.env.PORT || 3000);
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Server started on port : ' + app.get('port'));
});
