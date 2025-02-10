import React, {useState} from "react";
import api from "../api";


function ChangePassword() {
    const [current_password, setCurrentPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const updatePassword = async (e) => {
        e.preventDefault();

        if (new_password !== confirmNewPassword) {
            alert("New passwords do not match!");
            return;
        }

        if (new_password.length <= 0) {
            alert("Enter a new password!");
            return;
        }

        if (current_password.length <= 0) {
            alert("Enter the current password!");
            return;
        }

        try {
            // Create a FormData object to send the form-encoded data
            const formData = new FormData();
            formData.append("current_password", current_password);
            formData.append("new_password", new_password);

            const res = await api.post("auth/change-password", formData);

            if (res.status === 200 || res.status === 201) {
                alert("Password updated successfully");
            } else {
                alert("Failed to update password");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };

    return (

        < div className="flex flex-col pt-[35px] items-center justify-center">
            <h1 className="text-[30px] mb-[10px] pt-10">CHANGE PASSWORD</h1>
            <form onSubmit={updatePassword}>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={current_password}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={new_password}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button type="submit" className="form-button">UPDATE PASSWORD</button>
            </form>
        </div>
    )
}

export default ChangePassword

/*
< div
className = "pt-[35px]" >
    < form
onSubmit = {updatePassword} >
    < label
htmlFor = "current-password" > Current
Password < /label>
<br/>
<input
    type="password"
    id="current-password"
    name="current-password"
    required
    onChange={(e) => setCurrent_password(e.target.value)}
    value={current_password}
/>
<label htmlFor="new-password">New Password</label>
<input
    type="password"
    id="new-password"
    name="new-password"
    required
    onChange={(e) => setNew_password(e.target.value)}
    value={new_password}
/>
<label htmlFor="new-password">Confirm New Password</label>
<input
    type="password"
    id="confirm-password"
    name="confirm-password"
    required
    onChange={(e) => setConfirmNewPassword(e.target.value)}
    value={confirmNewPassword}
/>
<button type="submit" className="form-button">Update Password</button>
</form>
</div>

 */