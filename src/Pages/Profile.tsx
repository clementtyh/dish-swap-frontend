import Container from "../components/Container.js";
import settingsIcon from "../content/svg/settingsIcon.svg";

function Profile() {
  const displayName = sessionStorage.getItem("displayName");

  return (
    <>
      <Container>
        <div className="mt-32 justify-center">
          <div className="my-8 w-full flex justify-center">
            <div className="card w-96" style={{ backgroundColor: "#E6E6CB" }}>
              <div className="flex justify-end mt-3 mr-3">
                <button>
                  <img src={settingsIcon} />
                </button>
              </div>
              <div className="avatar justify-center">
                <div className="w-48 rounded-full">
                  <img src="https://www.womansworld.com/wp-content/uploads/2024/08/cute-cats.jpg?w=953" />
                </div>
              </div>
              <div className="card-body">
                <h2 className="card-title justify-center">{displayName}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="flex justify-center">Following</p>
                    <p className="flex justify-center">42</p>
                  </div>
                  <div>
                    <p className="flex justify-center">Followers</p>
                    <p className="flex justify-center">893</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-16 col-start-1 col-end-9">
            <div className="btn-group grid grid-cols-3 gap-1">
              <button className="btn">Flavourmarks</button>
              <button className="btn btn-active">Recipes</button>
              <button className="btn">Reviews by {displayName}</button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
