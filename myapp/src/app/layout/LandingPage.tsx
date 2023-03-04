import Authorized from "../../features/auth/Authorized";

export default function LandingPage() {
    return (
        <>
          <h3>This is landing page.</h3>

          <Authorized 
            authorized={<>You are authorized</>}
            noAuthorized={<>You are not authorized</>}
            role="admin"
          />

        </>
    )
}