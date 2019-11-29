package lohith.com.offlinepay;

import java.math.BigInteger;

public class publickeys {
    String n , d , name , number , acc;

    public publickeys(){}

    public publickeys(String n, String d, String name, String number, String acc) {
        this.n = n;
        this.d = d;
        this.name = name;
        this.number = number;
        this.acc = acc;
    }

    public String getN() {
        return n;
    }

    public void setN(String n) {
        this.n = n;
    }

    public String getD() {
        return d;
    }

    public void setD(String e) {
        this.d = d;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getAcc() {
        return acc;
    }

    public void setAcc(String acc) {
        this.acc = acc;
    }
}
