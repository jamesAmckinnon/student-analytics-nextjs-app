function SignIn({ signIn }) {
    if (signIn) {
      return (
        <div>
            <div className= "signIn-frame">
                <div className="signIn-wrapper">
                    <div className="signIn-body">
                        <div className="signIn-heading">
                            <div className="heading">
                                <h1>Sign In</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
    } else {
      return null
    }
  }
  
  export default SignIn