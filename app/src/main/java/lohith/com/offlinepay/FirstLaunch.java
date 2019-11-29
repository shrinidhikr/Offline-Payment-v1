package lohith.com.offlinepay;

import android.app.Activity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class FirstLaunch  extends Activity {
    FirebaseDatabase database = FirebaseDatabase.getInstance();


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_register);

        Button b = findViewById(R.id.submit);


        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                DatabaseReference myRef = database.getReference("account_public");
                String account = ( (EditText)findViewById(R.id.acc) ).getText().toString();
                String number = ( (EditText) findViewById(R.id.number) ).getText().toString();
                String name = ( (EditText) findViewById(R.id.name) ).getText().toString();


                RSA rsa = new RSA(1024);
                String n = String.valueOf(rsa.getN());
                String e = String.valueOf(rsa.getD());

                publickeys p = new publickeys(n,e,name,number,account);

                String key = myRef.push().getKey();
                myRef.child(key).setValue(p);
            }
        });



    }
}
