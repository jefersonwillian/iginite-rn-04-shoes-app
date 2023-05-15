import OneSignal from "react-native-onesignal";

// export function tagUserEmailCreate(email: string) {
//     // OneSignal.sendTag("user_email", email);
//     OneSignal.deleteTag("user_email");
// }


export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: "Jeferson",
    user_email: "jeferson.wc@outlook.com",
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag("cart_items_count", itemsCount);
}