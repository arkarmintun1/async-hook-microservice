import app from './app';
import { init } from './init';

init();

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
