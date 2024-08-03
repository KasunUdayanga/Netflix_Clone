import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function AuthScreen() {
  const [email, setEmail] = useState("");
  return (
    <div className="hero-bg relative">
      {/*  navigation bar */}

      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="./netflix-logo.png"
          alt="Netflix logo"
          className="w-32 md:w-52"
        />
        <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
          Sign-IN
        </Link>
      </header>

      {/* hero section*/}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited <i>Movies</i>,<i>TV-Shows</i> & More..
        </h1>
        <p className="text-lg mb-4">Watch Anywhere. Cancel Anytime.</p>
        <p className="mb-4">
          <i>Ready to Watch? </i> Enter your Email to create or Restart your
          membership.
        </p>

        <form className="flex flex-col md:flex-row gap-4 w-1/2">
          <input
            type="email"
            placeholder="Email address"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md-py-2 rounded flex justify-center items-center">
            Get-Start
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/*section -01 */}
      <div className="py-10 bg-black text-white">
        
      </div>
    </div>
  );
}
export default AuthScreen;
