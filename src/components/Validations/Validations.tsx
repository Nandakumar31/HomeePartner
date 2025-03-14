import { Alert } from "react-native";


type ProfileData = {
    aadharCardBack: string;
    aadharCardFront: string;
    drivingLicenseBack: string;
    drivingLicenseFront: string;
    mailId: string;
    mobileNumber: string;
    name: string;
    profileImageUri: string;
};

type VehicleData = {
    vehicleInsuranceBackSide: string;
    vehicleInsuranceExpiredate: string;
    vehicleInsuranceFrontSide: string;
    vehicleName: string;
    vehicleNumber: string;
    vehicleRcBackSide: string;
    vehicleRcFrontSide: string;
    vehicleType: string;
};

type BankData = {
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    copyofAccountNumber: string;
    ifscCode: string;
};


export const validateProfileData = (data: ProfileData) => {
    const errors: string[] = [];

    if (!data.name || data.name.length <= 3) {
        errors.push("Name must be greater than 3 characters");
    }

    if (!data.mailId || !/\S+@\S+\.\S+/.test(data.mailId)) {
        errors.push("Valid email is required");
    }

    if (!data.mobileNumber || data.mobileNumber.length !== 10) {
        errors.push("Mobile number must be 10 digits");
    }

    if (!data.aadharCardFront) {
        errors.push("Aadhar Card Front image is required");
    }

    if (!data.aadharCardBack) {
        errors.push("Aadhar Card Back image is required");
    }

    if (!data.drivingLicenseFront) {
        errors.push("Driving License Front image is required");
    }

    if (!data.drivingLicenseBack) {
        errors.push("Driving License Back image is required");
    }

    if (!data.profileImageUri) {
        errors.push("Profile Image is required");
    }

    if (errors.length > 0) {
        Alert.alert("Profile Validation Errors", errors.join("\n"));
        return false;
    }

    return true;
};


export const validateVehicleData = (data: VehicleData) => {
    const errors: string[] = [];

    if (!data.vehicleType) {
        errors.push("Vehicle Type is required");
    }

    if (!data.vehicleName || data.vehicleName.length <= 3) {
        errors.push("Vehicle Name must be greater than 3 characters");
    }

    if (!data.vehicleNumber) {
        errors.push("Vehicle Number is required");
    }

    if (!data.vehicleRcFrontSide) {
        errors.push("Vehicle RC Front Side image is required");
    }

    if (!data.vehicleRcBackSide) {
        errors.push("Vehicle RC Back Side image is required");
    }

    if (!data.vehicleInsuranceFrontSide) {
        errors.push("Vehicle Insurance Front Side image is required");
    }

    if (!data.vehicleInsuranceBackSide) {
        errors.push("Vehicle Insurance Back Side image is required");
    }

    if (!data.vehicleInsuranceExpiredate) {
        errors.push("Vehicle Insurance Expire Date is required");
    }

    if (errors.length > 0) {
        Alert.alert("Vehicle Validation Errors", errors.join("\n"));
        return false;
    }

    return true;
};
export const validateBankData = (data: BankData) => {
    const errors: string[] = [];

    if (!data.accountHolderName || data.accountHolderName.length <= 3) {
        errors.push("Account Holder Name must be greater than 3 characters");
    }

    if (!data.accountNumber) {
        errors.push("Account Number is required");
    }

    if (!data.copyofAccountNumber || data.copyofAccountNumber !== data.accountNumber) {
        errors.push("Copy of Account Number must match the Account Number");
    }
  
    if (!data.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifscCode)) {
        errors.push("Valid IFSC Code is required");
    }

    if (errors.length > 0) {
        Alert.alert("Bank Validation Errors", errors.join("\n"));
        return false;
    }

    return true;
};
