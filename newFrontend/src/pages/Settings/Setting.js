import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

export const Setting = () => {

    return (
        <div className="wrapper flex-column">
            <ProfileForm/>
            <div style={{marginTop: '5rem'}}>
                <ChangePasswordForm/>
            </div>
        </div>
    );
}