import { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { signInRequest } from "../../requests/auth.request";
import { ToastPicker } from "../../utils/toastPicker";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
type Props = {};

type loginCredentials = {
  email: string;
  password: string;
};

export default function Login({}: Props) {
  // hooks define
  const navigate = useNavigate();
  const signIn = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginCredentials>();
  const { mutate, status } = useMutation(signInRequest, {
    onSuccess(response: AxiosResponse) {
      if (
        signIn({
          token: response.data.access_token,
          authState: response.data.user,
          tokenType: "Bearer",
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refresh_token,
        })
      ) {
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

  const handleLogin = async (data: loginCredentials): Promise<void> => {
    await mutate({ ...data });
  };

  return (
    <div>
      <div className="h-12 bg-warning items-center flex justify-center">
        <h1 className="font-semibold text-2xl">Login to FqRecipe</h1>
      </div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="p-5">
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
              Login
            </button>
          </div>
          <p className="mt-2 text-blue-600 text-center">
            Don't have account ? <a href="">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}
