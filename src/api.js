import PointsModel from "./model/points.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._request({url: `points`})
      .then(Api.toJSON)
      .then((serverPoints) => serverPoints.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    return this._request(
        {
          url: `points/${point.id}`,
          method: Method.PUT,
          body: JSON.stringify(PointsModel.adaptToServer(point)),
          headers: new Headers({"Content-Type": `application/json`})
        }
    )
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  addPoint(point) {
    return this._request(
        {
          url: `points`,
          method: Method.POST,
          body: JSON.stringify(PointsModel.adaptToServer(point)),
          headers: new Headers({"Content-Type": `application/json`})
        }
    )
    .then(Api.toJSON)
    .then(PointsModel.adaptToClient);
  }

  deletePoint(point) {
    return this._request(
        {
          url: `points/${point.id}`,
          method: Method.DELETE,
        }
    );
  }

  getDestinations() {
    return this._request({url: `destinations`})
      .then(Api.toJSON);
  }

  getOffers() {
    return this._request({url: `offers`})
      .then(Api.toJSON);
  }

  _request({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`_${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
