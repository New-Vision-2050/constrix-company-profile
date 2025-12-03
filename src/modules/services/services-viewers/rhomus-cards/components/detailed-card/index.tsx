import AspectRatio from "@/components/ui/others/aspect-ratio";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

function DetailedCard() {
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      <Grid
        container
        spacing={2}
        p={1}
        sx={{ width: "100%" }}
        alignItems="stretch"
      >
        <Grid size={5.5}>
          <AspectRatio ratio={0.85} boxProps={{ sx: { borderRadius: 1.5 } }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png"
              alt="Detailed Card"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AspectRatio>
        </Grid>
        <Grid size={6.5}>
          <Stack spacing={2} justifyContent="space-between" p={3} height={1}>
            <Stack spacing={2}>
              <Typography
                variant="caption"
                textTransform="uppercase"
                color="primary.main"
                fontWeight={900}
              >
                Detailed Card
              </Typography>
              <Typography variant="h5">Technology Nixon</Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </Typography>
            </Stack>
            <Stack alignItems="flex-end">
              <Button
                sx={{ width: "fit-content" }}
                variant="text"
                color="inherit"
              >
                Read More
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default DetailedCard;
