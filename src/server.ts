import dotenv from 'dotenv';
import createApplication from './application';

dotenv.config();
const app = createApplication();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});