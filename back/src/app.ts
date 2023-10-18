import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { authRouter } from './routers/auth';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { userRouter } from './routers/user';
import { catRouter } from './routers/cat';
import { subcatRouter } from './routers/subcat';
import { productRouter } from './routers/product';
import { inquiryRouter } from './routers/inquiry';
import { offeringRouter } from './routers/offering';
let cors = require("cors");


const app = express();
app.use(cors());
app.set('trust proxy',true);
app.use(json());
app.use(authRouter);
app.use(userRouter);
app.use(catRouter);
app.use(subcatRouter);
app.use(productRouter);
app.use(inquiryRouter);
app.use(offeringRouter);

app.all('*', async () => {
     throw new NotFoundError();
});

app.use(errorHandler);

export {app}

