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
            "invalidId": "Invalid Id"
        }
    },
    roleApi: {
        error: {
            "notFound": "Roles not found",
            "notFoundById": "Cannot find role using this roleId",
        }
    }
}

module.exports = message