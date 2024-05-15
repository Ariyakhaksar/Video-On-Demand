import { FormikErrors, FormikTouched } from "formik";

export type TokenDetails = {
   user_id: number;
   phone: string;
   name: string;
   lastname: string;
   is_admin: boolean;
};

export type SigninType = {
   phone: string;
   password: string;
};

export type FormikFormSignInTpye = {
   values: SigninType;
   errors: FormikErrors<SigninType>;
   touched: FormikTouched<SigninType>;
   handleChange: {
      (e: React.ChangeEvent<SigninType>): void;
      <T_1 = string | React.ChangeEvent<SigninType>>(
         field: T_1
      ): T_1 extends React.ChangeEvent<SigninType>
         ? void
         : (e: string | React.ChangeEvent<SigninType>) => void;
   };
};


