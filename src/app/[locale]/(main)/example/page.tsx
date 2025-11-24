import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function ExamplePage() {
  return (
    <MainPageContent
      title="Example Page"
      description={
        <Typography variant="body1">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
          tenetur nam a eos unde voluptas amet mollitia porro vel culpa.
          Inventore molestias tempore facere, repellat incidunt dolores nisi
          provident architecto pariatur excepturi natus aspernatur perspiciatis.
          Inventore, qui, sit necessitatibus cumque quidem iste quia autem,
          nobis expedita exercitationem atque fuga ipsum!
        </Typography>
      }
    >
      <LayoutStack>
        <PageSection>This is the main content of the page</PageSection>
        <PageSection>
          <Typography variant="body1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consectetur tenetur nam a eos unde voluptas amet mollitia porro vel
            culpa. Inventore molestias tempore facere, repellat incidunt dolores
            nisi provident architecto pariatur excepturi natus aspernatur
            perspiciatis. Inventore, qui, sit necessitatibus cumque quidem iste
            quia autem, nobis expedita exercitationem atque fuga ipsum!
          </Typography>
        </PageSection>
        <PageSection>
          <Stack spacing={2}>
            <TextField label="Name" placeholder="Enter your name" />
            <TextField label="Email" placeholder="Enter your email" />
            <TextField label="Password" placeholder="Enter your password" />
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </PageSection>
        <Divider flexItem />
        <PageSection>
          <Typography variant="h5" gutterBottom>
            User Registration Form
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Fill in all the required information to create your account
          </Typography>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid size={12}>
              <Typography variant="h6" color="primary">
                Personal Information
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                placeholder="Enter your first name"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                placeholder="Enter your last name"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="email"
                label="Email Address"
                placeholder="example@email.com"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
              />
            </Grid>

            {/* Address Information */}
            <Grid size={12}>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Address Information
              </Typography>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Street Address"
                placeholder="Enter your street address"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField fullWidth label="City" placeholder="Enter your city" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                fullWidth
                label="State/Province"
                placeholder="Enter your state"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                fullWidth
                label="Postal Code"
                placeholder="Enter postal code"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth select label="Country" defaultValue="">
                <MenuItem value="">Select a country</MenuItem>
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="ca">Canada</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="au">Australia</MenuItem>
              </TextField>
            </Grid>

            {/* Account Details */}
            <Grid size={12}>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Account Details
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Username"
                placeholder="Choose a username"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth select label="Account Type" defaultValue="">
                <MenuItem value="">Select account type</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="enterprise">Enterprise</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                placeholder="Create a password"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                placeholder="Re-enter your password"
                required
              />
            </Grid>

            {/* Additional Information */}
            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Bio"
                placeholder="Tell us about yourself..."
              />
            </Grid>

            {/* Actions */}
            <Grid size={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" size="large">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" size="large">
                  Create Account
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}

export default ExamplePage;
