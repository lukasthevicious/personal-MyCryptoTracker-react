import React, { useState, useRef, useEffect, useContext } from "react";
import Input from "../Input";
import { StyledForm } from "./styled";
import { Button } from "@mui/material";
import DashboardContext from "../../state/DashboardContext";
import FormContext from "../../state/FormContext";
import CryptoSelect from "./CryptoSelect";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  addHolding,
  updateHolding,
  deleteHolding,
} from "../../state/actions/holdings";
import { addTransaction } from "../../state/actions/transactions";
import TransactionType from "./TransactionType";
import { lsUserId } from "../../utils/ls-userId";
import { RootState } from "../..";
import updateHoldingStatistics from "./updateHoldingStatistics";
import { HoldingItem } from "../../common/modelTypes";

const Form: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [inputName, setInputName] = useState<string>("");
  const priceInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [buySell, setBuySell] = useState<"buy" | "sell">("buy");

  const [loggedUserId, setLoggedUserId] = useState();
  const [formIsValid, setFormIsValid] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const holdings = useAppSelector((state: RootState) => state.holdings);

  const context = useContext(DashboardContext);

  const formContext = useContext(FormContext);

  useEffect(() => {
    context?.getDashboardData();
    setLoggedUserId(lsUserId());
  }, []);

  useEffect(() => {
    setInputName(formContext?.selectedCrypto!);
    setBuySell(formContext?.transactionType!);
  }, [formContext?.selectedCrypto, formContext?.transactionType]);

  useEffect(() => {
    setFormIsValid(true);
  }, [inputName, buySell]);

  const selectedCryptoInput = (crypto: string) => {
    setInputName(crypto);
  };

  const onSubmitHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    let existingItem;
    if (buySell === "sell") {
      existingItem = holdings.find(
        (holding: HoldingItem) => holding.name === inputName
      );
    }

    //Validace, že nedavam transakci, kdy prodam vic nez aktualne drzim v Holdings - pak se prirazuje formIsValid state.
    if (
      buySell === "sell" &&
      existingItem.amount >= amountInputRef.current?.value!
    ) {
      setFormIsValid(true);
      const formItem = {
        transactionType: buySell,
        userId: loggedUserId!,
        name: inputName,
        price: parseInt(priceInputRef.current?.value!),
        amount: parseInt(amountInputRef.current?.value!),
        date: dateInputRef.current!.value,
      };

      //Clearing inputs
      if (formRef.current !== null) {
        formRef.current.reset();
      }
      setInputName("");

      //Sleduju, jestli položka už v array existuje.

      //Forma itemu, který se posílá do holdings reduceru
      //ZKUSIT DAT ZKRACENE
      const newHoldingItem = {
        userId: formItem.userId,
        name: formItem.name,
        price: formItem.price,
        amount: formItem.amount,
        date: formItem.date,
      };

      //Forma itemu, který se posílá do transactions reduceru
      const newTransactionItem = {
        transactionType: formItem.transactionType,
        userId: formItem.userId,
        name: formItem.name,
        price: formItem.price,
        amount: formItem.amount,
        date: formItem.date,
      };
      formContext?.setFormShown(false);

      if (existingItem !== undefined) {
        const updatedHolding = updateHoldingStatistics(existingItem, formItem);
        if (updatedHolding.amount != 0) {
          dispatch(updateHolding(formItem.name, updatedHolding));
        }
        dispatch(
          deleteHolding({ userId: loggedUserId!, itemName: formItem.name })
        );
      } else dispatch(addHolding(newHoldingItem));
      dispatch(addTransaction(newTransactionItem));
    }

    setFormIsValid(false);

    /* if (formIsValid) {
      //Sesbírání infa o transakci. Pak se pošle do statistics-slice a history-slice. Do každého slice jiné údaje.
      const formItem = {
        transactionType: buySell,
        userId: loggedUserId!,
        name: inputName,
        price: parseInt(priceInputRef.current?.value!),
        amount: parseInt(amountInputRef.current?.value!),
        date: dateInputRef.current!.value,
      };

      //Clearing inputs
      if (formRef.current !== null) {
        formRef.current.reset();
      }
      setInputName("");

      //Sleduju, jestli položka už v array existuje.
      const existingItem = holdings.find(
        (holding: HoldingItem) => holding.name === formItem.name
      );
      //Validace, že nedavam transakci, kdy prodam vic nez aktualne drzim v Holdings

      //Forma itemu, který se posílá do holdings reduceru
      //ZKUSIT DAT ZKRACENE
      const newHoldingItem = {
        userId: formItem.userId,
        name: formItem.name,
        price: formItem.price,
        amount: formItem.amount,
        date: formItem.date,
      };

      //Forma itemu, který se posílá do transactions reduceru
      const newTransactionItem = {
        transactionType: formItem.transactionType,
        userId: formItem.userId,
        name: formItem.name,
        price: formItem.price,
        amount: formItem.amount,
        date: formItem.date,
      };
      formContext?.setFormShown(false);

      if (existingItem !== undefined) {
        const updatedHolding = updateHoldingStatistics(existingItem, formItem);
        if (updatedHolding.amount != 0) {
          dispatch(updateHolding(formItem.name, updatedHolding));
        }
        dispatch(
          deleteHolding({ userId: loggedUserId!, itemName: formItem.name })
        );
      } else dispatch(addHolding(newHoldingItem));
      dispatch(addTransaction(newTransactionItem));
    } */
    console.log("final" + formIsValid);
  };

  const handleBuySellChange = (
    e: React.MouseEvent<HTMLElement>,
    newBuySell: "buy" | "sell"
  ) => {
    if (newBuySell !== null) {
      /* setBuySell(newBuySell); */
      formContext?.setTransactionType(newBuySell);
    }
  };

  return (
    <StyledForm onSubmit={onSubmitHandler} ref={formRef}>
      <div className="form">
        <div className="form-data-container">
          <TransactionType
            buySell={buySell}
            handleBuySellChange={handleBuySellChange}
          />
          <CryptoSelect selected={selectedCryptoInput} value={inputName} />
          <Input
            label=""
            input={{
              id: "Price per item",
              type: "number",
              ref: priceInputRef,
              min: 0.01,
              step: 0.01,
            }}
            startAdornment="$"
            autoFocus
          />
          <Input
            label=""
            input={{
              id: "Amount",
              type: "number",
              ref: amountInputRef,
              min: 0.00001,

              step: 0.00001,
            }}
          />
          <p className={formIsValid ? "hide" : "display"}>
            You can't sell more than you hold. Your acutal holding of Bitcoin is
            4
          </p>
          <Input
            label=""
            input={{
              id: "Date",
              type: "date",
              ref: dateInputRef,
            }}
          />
          <div className="buttons-container">
            <Button type="submit" variant="contained">
              Add transaction
            </Button>
            <Button
              onClick={() => formContext?.setFormShown(false)}
              variant="outlined"
              color="error"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </StyledForm>
  );
};
export default Form;
