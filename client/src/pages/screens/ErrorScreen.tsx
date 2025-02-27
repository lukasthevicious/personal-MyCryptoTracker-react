import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { RootState } from "../..";
import { CLEAR_ERROR } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";
import { StyledErrorScreen } from "./styled";
import MyButton from "../../components/layout/MyButton";

const ErrorScreen: FC = () => {
  const error = useAppSelector((state: RootState) => state.errorAndLoading);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const clearErrorAndGoDashboard = (): void => {
    dispatch({ type: CLEAR_ERROR });
    history.push("/dashboard");
  };

  return (
    <StyledErrorScreen>
      <div className="container">
        <h1>Something went wrong...</h1>
        <h2>{error.errorMessage}</h2>
        <MyButton
          variant="contained"
          onClick={clearErrorAndGoDashboard}
          text="Back to Dashboard"
          purple
        />
      </div>
    </StyledErrorScreen>
  );
};
export default ErrorScreen;
