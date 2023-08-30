import { UserIcon } from "@heroicons/react/20/solid";
import Grid from "../../components/common/Grid";
import ListBox from "./ListBox";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useSignOut } from "react-auth-kit";
import { useMutation } from "react-query";
import { signOutRequest } from "../../requests/auth.request";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ToastPicker } from "../../utils/toastPicker";
const Account = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { status, mutate } = useMutation(signOutRequest, {
    onSuccess() {
      if (signOut()) navigate("/auth/login");
    },
    onError(error: AxiosError) {
      ToastPicker(
        error.response?.status as number,
        (error.response?.data as any).message ?? ""
      );
    },
  });
  const handleLogout = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await mutate();
  };
  return (
    <Grid>
      <div className="mt-2 space-y-3">
        <ListBox Icon={UserIcon} title="My Account" to={"/"} />
        <ListBox Icon={FolderIcon} title="Recipe" to={"/"} />
      </div>
      <div className="px-2">
        <button
          onClick={handleLogout}
          className="btn btn-error btn-outline"
          disabled={status === "loading"}
        >
          Logout
        </button>
      </div>
    </Grid>
  );
};

export default Account;
