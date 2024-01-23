namespace MuchomorekBack.DTO
{
    public class DTOHarvestWithVoid
    {
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int Amount { get; set; }
        public string Type { get; set; }
        public string Voidvodeship { get; set; }
        public DTOHarvestWithVoid() { }
        public DTOHarvestWithVoid(float szer_geo, float dlu_geo, int ile, string rodzaj, string voidvodeship)
        {
            this.Type = rodzaj;
            this.Amount = ile;
            this.Latitude = szer_geo;
            this.Longitude = dlu_geo;
            this.Voidvodeship = voidvodeship;
        }
    }
}
