package com.thecommonsproject.smarthealthcardverifier;

import android.os.Bundle;
import android.view.WindowManager;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Verifier";
  }


  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    disableScreenshot();
  }

  private void disableScreenshot(){
      getWindow().setFlags(
              WindowManager.LayoutParams.FLAG_SECURE,
              WindowManager.LayoutParams.FLAG_SECURE
      );
  }
}
