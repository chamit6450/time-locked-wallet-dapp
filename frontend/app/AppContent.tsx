import LockedAssets from "./LockedAssets";
import Timelock from "./Timelock";

function AppContent() {
    return (
      <div className="min-h-screen">
  
        <main className="main-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card ">
              <h1 className="gradient-text text-4xl mb-6">Secure Your ETH</h1>
              <p className="text-gray-300 mb-6">
                Lock your ETH securely with our advanced time-lock vault system.
                Set your desired lock period and rest assured your assets are safe.
              </p>
              <Timelock/>
            </div>
            <div className="card ">
              <h2 className="gradient-text text-2xl mb-6">Vault Status</h2>
              <LockedAssets />
            </div>
          </div>
        </main>
      </div>
    );
  }