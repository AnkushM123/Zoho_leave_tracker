const message = {
    authApi: {
        error: {
            "invalidCredential": "Invalid username or password",
            "tokenMissing": "Unauthorized: Token missing",
            "invalidToken": "Forbidden: Invalid token",
            "passwordValidation": "Password must contain at least 8 characters, one uppercase,one lowercase, one number and one special case character",
            "mobileValidation": "Mobile number is not valid",
        }
    },
    userApi: {
        success: {
            "updateUser": "User updated successfully",
            "changePassword": "Password changed successfully"
        },
        error: {
            "notFound": "User not found",
            "findUserById": "Cannot find user using this userId",
            "passwordValidation": "Password must contain at least 8 characters, one uppercase,one lowercase, one number and one special case character",
            "mobileValidation": "Mobile number is not valid",
            "invalidId": "Invalid Id",
            "passwordNotMatched": "Old password not matched"
        }
    },
    roleApi: {
        error: {
            "notFound": "Roles not found",
            "notFoundById": "Cannot find role using this roleId",
        }
    },
    leaveTypeApi: {
        error: {
            "notFound": "leaves not found",
            "notFoundById": "Cannot find leave using this leaveId",
        }
    },
    leaveRecordApi: {
        success: {
            "updateRecord": "Leave record updated successfully",
            "changePassword": "Password changed successfully"
        },
        error: {
            "notFound": "Leave record not found",
            "invalidUserId": "Invalid UserId",
            "invalidLeaveId": "Invalid LeaveId"
        }
    },
    leaveRequestApi: {
        success: {
            "updateRecord": "Leave request updated successfully",
            "changeStatus": "Status changed successfully"
        },
        error: {
            "notFound": "Leave request not found",
            "invalidUserId": "Invalid UserId",
            "invalidManagerId": "Invalid ManagerId",
            "invalidRequestId": "Invalid RequestId"
        }
    }
}

module.exports = message