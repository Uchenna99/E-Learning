// import { db } from "config/db"
// import { CreateUserDTO } from "dtos/CreateUser.dto"
// import { NextFunction } from "express"


// export const extLogin = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//     data: CreateUserDTO
// ): Promise<void> => {
//     const userData = req.body as CreateUserDTO;

//     if (!userData || !userData.email || !userData.firstName || !userData.lastName) {
//       return res.status(400).json({ message: 'Invalid user data' });
//     }
//   const findUser = await db.user.findUnique({
//     where: {email: userData.email }
//   })
//   if (!findUser){
//     const newUser = db.user.create({
//         data: {
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             email: userData.email,
//             password: '12345678'
//         }
//     })
//     next();
//   }
// }

// export default extLogin