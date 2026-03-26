import Text "mo:core/Text";
import Order "mo:core/Order";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Signup = {
    name : Text;
    email : Text;
  };

  module Signup {
    public func compare(signup1 : Signup, signup2 : Signup) : Order.Order {
      switch (Text.compare(signup1.name, signup2.name)) {
        case (#equal) { Text.compare(signup1.email, signup2.email) };
        case (order) { order };
      };
    };
  };

  let signups = Map.empty<Principal, Signup>();

  public shared ({ caller }) func addSupporter(name : Text, email : Text) : async () {
    let existingEmails = signups.values().find(func(s) { s.email == email });
    if (existingEmails.isSome()) {
      Runtime.trap("This email is already registered");
    };
    let signup : Signup = {
      name;
      email;
    };
    signups.add(caller, signup);
  };

  public query ({ caller }) func getSupporterCount() : async Nat {
    signups.size();
  };

  public query ({ caller }) func getSignups() : async [Signup] {
    signups.values().toArray().sort();
  };
};
