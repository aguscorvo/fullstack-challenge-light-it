def getTemplate(name):
  return f"""<html>
    <body
        style="
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
        "
    >
        <div
        style="
            width: 100%;
            background: #efefef;
            border-radius: 10px;
            padding: 10px;
        "
        >
        <div style="margin: 0 auto; width: 90%; text-align: center">
            <h1
            style="
                background-color: rgba(0, 53, 102, 1);
                padding: 5px 10px;
                border-radius: 5px;
                color: white;
            "
            >
            Registration Confirmed!
            </h1>
            <div
            style="
                margin: 30px auto;
                background: white;
                width: 40%;
                border-radius: 10px;
                padding: 50px;
                text-align: center;
            "
            >
            <h3 style="margin-bottom: 100px; font-size: 24px">{name},</h3>
            <p style="margin-bottom: 30px">
                We are glad to inform you that you have been successfully registered
                to our platform.
            </p>
            </div>
        </div>
        </div>
    </body>
    </html>"""

