export const handleFirebaseError = (error) => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/invalid-credential':
            return 'Invalid credentials. Please check and try again later.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/user-not-found':
            return 'No user found with this email address.';
        case 'auth/email-already-in-use':
            return 'This email address is already in use.';
        case 'auth/network-request-failed':
            return 'Please check your network and try again.';
        default:
            return `An unexpected error occurred: ${error.message}`;
    }
};