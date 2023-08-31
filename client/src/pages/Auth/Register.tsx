import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PayloadSignUp, signUpRequest } from "../../requests/auth.request";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ToastPicker } from "../../utils/toastPicker";
type Props = {};

export default function Register({}: Props) {
  // hooks define
  const navigate = useNavigate();
  const signIn = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PayloadSignUp>();
  const { mutate, status } = useMutation(signUpRequest, {
    onSuccess(response: AxiosResponse) {
      if (
        signIn({
          token: response.data.data.access_token,
          authState: response.data.data.user,
          tokenType: "Bearer",
          expiresIn: response.data.data.expiresIn,
          refreshToken: response.data.data.refresh_token,
        })
      ) {
        ToastPicker(201,"Register successfully")
        navigate("/", { replace: true });
      }
    },
    onError(error: AxiosError) {
      ToastPicker(
        error.response?.status as number,
        (error.response?.data as any).message ?? ""
      );
    },
  });

  const handleSignUp = async (data: PayloadSignUp): Promise<void> => {
    await mutate({ ...data });
  };

  return (
    <div>
      <div className="h-12 bg-warning items-center flex justify-center">
        <h1 className="font-semibold text-2xl">Register to FqRecipe</h1>
      </div>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="p-5">
          <div className="form-control my-4">
            <input
              type="text"
              className="input input-bordered"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.password && <p role="alert">{errors.password?.message}</p>}
          </div>
          <div className="form-control my-4">
            <input
              type="email"
              className="input input-bordered"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && <p role="alert">{errors.email?.message}</p>}
          <div className="form-control my-4">
            <input
              type="password"
              className="input input-bordered"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && <p role="alert">{errors.password?.message}</p>}
          </div>
          <div className="grid">
            <button
              className="btn btn-warning disabled:bg-opacity-75"
              disabled={status === "loading"}
            >
              {status === "loading" && (
                <span className="loading loading-spinner"></span>
              )}
              Register
            </button>
          </div>
          <p className="mt-2 text-blue-600 text-center">
            have account ? <Link to={"/auth/login"}>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
