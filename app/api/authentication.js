import client from './client';

const endpointRequestOtp = "/phoneNumberAuth";
const endpointVerifyOtp = "/otpAuth";

const requestOtp = (number) => client.post(endpointRequestOtp, {number});
const verifyOtp = (number, otp) => client.post(endpointVerifyOtp, {number, otp});

export default {
    requestOtp,
    verifyOtp,
}