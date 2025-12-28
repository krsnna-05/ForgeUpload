const Uploads = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

const Header = () => {
  return (
    <div className=" border-b border-border px-4 sm:px-6 lg:px-8">
      <h1 className="text-lg font-bold px-3 bg-muted rounded-full inline relative top-3.5 text-muted-foreground">
        {" "}
        Your Uploads
      </h1>
    </div>
  );
};

export default Uploads;
