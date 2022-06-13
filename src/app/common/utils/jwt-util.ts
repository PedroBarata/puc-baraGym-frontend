import { JwtSub } from "src/app/model/jwt-sub.model";

export class JwtUtil {

  public static parseJwt(value: string): JwtSub {
    var base64Url = value.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}
