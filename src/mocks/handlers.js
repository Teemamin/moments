import { rest } from "msw";

const baseURL = "https://teemamin-drf-api.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    // when our tests try to reach out to this endpoint to get the users details,our mocked
    // api request handlers will intercept the test request and respond with our provided data
    // our mocked api request handlers will intercept the test request and respond with our provided
    // data here, indicating that for my test Gregam is the currently logged in user
    return res(
      ctx.json({
        "pk": 3,
        "username": "Gregam",
        "email": "",
        "first_name": "",
        "last_name": "",
        "profile_id": 3,
        "profile_image": "https://res.cloudinary.com/docrd9dcy/image/upload/v1/media/images/pasport-pic_owqtk9"
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];